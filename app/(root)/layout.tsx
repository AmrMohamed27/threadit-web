export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen container">
      {children}
    </div>
  );
}
