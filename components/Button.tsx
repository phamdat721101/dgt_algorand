export default function Button({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <button className="rounded-[10px] bg-blue-600 px-4 pt-[18px] pb-4 text-white duration-200 hover:bg-blue-600/85 xl:px-6">
      {children}
    </button>
  );
}
