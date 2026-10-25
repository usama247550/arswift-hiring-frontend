export default function Notice({ title, children }) {
  return (
    <div className="notice" role="alert">
      <strong>{title}</strong>
      <p>{children}</p>
    </div>
  );
}
