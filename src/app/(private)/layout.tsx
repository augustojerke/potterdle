export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-96 py-10">
      <div className="border mt-20 rounded">{children}</div>
    </div>
  );
}
