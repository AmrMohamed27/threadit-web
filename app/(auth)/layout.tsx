export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-8 p-8 w-full min-h-screen">
      <div className="flex flex-col items-center gap-8 mx-auto py-6 max-w-[30%] min-h-screen container">
        {children}
      </div>
    </div>
  );
}
