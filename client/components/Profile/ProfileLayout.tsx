import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Footer from "@/components/HomePage/Layout/HomeFooter";

export default function ProfileLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <ProfileHeader></ProfileHeader>
            {children}
            <Footer></Footer>
        </div>
    );
}
