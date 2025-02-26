export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-8 px-8 py-4 min-h-screen container">
      {children}
    </div>
  );
}
