import { useEffect, useState } from "react";
import { createItem, deleteItem, getItems, updateItem } from "../api/api";

export default function CrudManager({
  title,
  resource,
  fields,
  emptyForm,
  buttonLabel,
}) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function loadItems() {
    try {
      setLoading(true);
      setError("");
      const result = await getItems(resource);
      setItems(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [resource]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function startEdit(item) {
    const updatedForm = { ...emptyForm };

    Object.keys(emptyForm).forEach((key) => {
      if (key === "completion" && item[key]) {
        updatedForm[key] = String(item[key]).slice(0, 10);
      } else {
        updatedForm[key] = item[key] || "";
      }
    });

    setForm(updatedForm);
    setEditingId(item.id);
    setNotice(`Editing ${title.toLowerCase()} item.`);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setForm(emptyForm);
    setEditingId("");
    setNotice("Edit cancelled.");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setNotice("");

      if (editingId) {
        await updateItem(resource, editingId, form);
        setNotice(`${title} updated successfully.`);
      } else {
        await createItem(resource, form);
        setNotice(`${title} added successfully.`);
      }

      setForm(emptyForm);
      setEditingId("");
      await loadItems();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(`Are you sure you want to delete this ${title.toLowerCase()} item?`);
    if (!confirmed) return;

    try {
      setError("");
      setNotice("");
      await deleteItem(resource, id);
      setNotice(`${title} removed successfully.`);
      await loadItems();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="dashboardSection">
      <div className="dashboardHeader">
        <h3>{title}</h3>
        <p className="muted">Add, edit, list, and delete {title.toLowerCase()} records.</p>
      </div>

      {notice ? <div className="notice">{notice}</div> : null}
      {error ? <div className="errorBox">{error}</div> : null}

      <form className="card dashboardForm" onSubmit={handleSubmit}>
        <div className="formGrid">
          {fields.map((field) => (
            <div className="field" key={field.name}>
              <label htmlFor={`${resource}-${field.name}`}>{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  id={`${resource}-${field.name}`}
                  name={field.name}
                  rows={field.rows || 4}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required !== false}
                />
              ) : (
                <input
                  id={`${resource}-${field.name}`}
                  type={field.type || "text"}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required !== false}
                />
              )}
            </div>
          ))}
        </div>

        <div className="formActions">
          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : editingId ? `Update ${buttonLabel}` : `Add ${buttonLabel}`}
          </button>

          {editingId ? (
            <button className="btn ghost" type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="dashboardList">
        {loading ? (
          <div className="card">Loading {title.toLowerCase()}...</div>
        ) : items.length === 0 ? (
          <div className="card">No {title.toLowerCase()} found yet.</div>
        ) : (
          items.map((item) => (
            <article key={item.id} className="card dashboardItem">
              <div className="dashboardItemBody">
                {Object.keys(emptyForm).map((key) => (
                  <p key={key}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                    {key === "completion" && item[key]
                      ? String(item[key]).slice(0, 10)
                      : item[key]}
                  </p>
                ))}
              </div>

              <div className="itemActions">
                <button className="btn ghost" type="button" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button className="btn danger" type="button" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}