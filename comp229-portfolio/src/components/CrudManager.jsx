import { useCallback, useEffect, useState } from "react";
import { createItem, deleteItem, getItems, updateItem } from "../api/api";

const MAX_IMAGE_PAYLOAD_BYTES = 45 * 1024;
const MAX_IMAGE_DIMENSION = 1080;
const MIN_JPEG_QUALITY = 0.32;
const MAX_REQUEST_BODY_BYTES = 95 * 1024;

function estimateDataUrlBytes(dataUrl) {
  const base64 = String(dataUrl).split(",")[1] || "";
  return Math.floor((base64.length * 3) / 4);
}

function estimateJsonBytes(payload) {
  return new TextEncoder().encode(JSON.stringify(payload)).length;
}

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to process selected image."));
    };

    image.src = objectUrl;
  });
}

async function createOptimizedImageDataUrl(file) {
  const image = await loadImageFromFile(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Image compression is not supported in this browser.");
  }

  const initialScale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(image.width, image.height));
  let width = Math.max(1, Math.round(image.width * initialScale));
  let height = Math.max(1, Math.round(image.height * initialScale));

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  let quality = 0.82;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);

  while (estimateDataUrlBytes(dataUrl) > MAX_IMAGE_PAYLOAD_BYTES && quality > MIN_JPEG_QUALITY) {
    quality -= 0.08;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }

  while (estimateDataUrlBytes(dataUrl) > MAX_IMAGE_PAYLOAD_BYTES && (width > 300 || height > 300)) {
    width = Math.max(1, Math.round(width * 0.8));
    height = Math.max(1, Math.round(height * 0.8));

    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);

    quality = 0.72;
    dataUrl = canvas.toDataURL("image/jpeg", quality);

    while (estimateDataUrlBytes(dataUrl) > MAX_IMAGE_PAYLOAD_BYTES && quality > MIN_JPEG_QUALITY) {
      quality -= 0.08;
      dataUrl = canvas.toDataURL("image/jpeg", quality);
    }
  }

  if (estimateDataUrlBytes(dataUrl) > MAX_IMAGE_PAYLOAD_BYTES) {
    throw new Error("Image is still too large after compression. Please choose a smaller image.");
  }

  return dataUrl;
}

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

  const loadItems = useCallback(async () => {
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
  }, [resource]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  async function handleChange(event) {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      const selectedFile = files && files[0];

      if (!selectedFile) {
        setForm((prev) => ({
          ...prev,
          [name]: "",
        }));
        return;
      }

      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      try {
        const imageDataUrl = await createOptimizedImageDataUrl(selectedFile);
        const imageSizeKb = Math.round(estimateDataUrlBytes(imageDataUrl) / 1024);

        setForm((prev) => ({
          ...prev,
          [name]: imageDataUrl,
        }));
        setError("");
        setNotice(`Image optimized (${imageSizeKb} KB) and ready to save.`);
      } catch (err) {
        setError(err.message);
      }

      return;
    }

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

      const estimatedPayloadBytes = estimateJsonBytes(form);

      if (estimatedPayloadBytes > MAX_REQUEST_BODY_BYTES) {
        setError("Payload is too large for this server limit. Use a smaller image and try again.");
        setSaving(false);
        return;
      }

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
      const lowerMessage = String(err.message || "").toLowerCase();

      if (lowerMessage.includes("too large") || lowerMessage.includes("entity")) {
        setError("Image payload is too large for the server. Try a smaller image and save again.");
      } else {
        setError(err.message);
      }
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
            <div
              className={`field${field.type === "textarea" || field.type === "file" ? " fieldWide" : ""}${field.type === "file" ? " fieldFile" : ""}`}
              key={field.name}
            >
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
              ) : field.type === "file" ? (
                <>
                  <input
                    id={`${resource}-${field.name}`}
                    type="file"
                    name={field.name}
                    accept={field.accept || "image/*"}
                    onChange={handleChange}
                    required={field.required !== false}
                  />
                  {form[field.name] ? (
                    <img className="dashboardThumb" src={form[field.name]} alt="Selected upload preview" />
                  ) : (
                    <p className="muted small uploadHint">Select an image to upload.</p>
                  )}
                </>
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
                      : key.toLowerCase().includes("image") && item[key]
                      ? "Image uploaded"
                      : item[key]}
                  </p>
                ))}
                {item.imageUrl ? (
                  <img className="dashboardThumb" src={item.imageUrl} alt={`${item.title || title} preview`} />
                ) : null}
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