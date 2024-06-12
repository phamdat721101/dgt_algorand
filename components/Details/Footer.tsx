import Image from "next/image";
import Link from "next/link";
// import bgNewsletter from "../public/assets/images/footer/bg-newsletter.png";
import Logo from "../../public/assets/images/logo.png";
import Button from "./Button";

export default function Footer() {
    return (
        <footer className="bg-white">
            {/* Footer content */}
            <div>
                {/* Top */}
                <div className="container mx-auto py-16">
                    <div className="grid items-center justify-between gap-y-20 xl:flex">
                        {/* Left */}
                        <div className="space-y-14">
                            <div>
                                <Link href="/">
                                    <Image
                                        className="h-auto w-44 xl:w-64"
                                        src={Logo}
                                        alt={"logo"}
                                    ></Image>
                                </Link>
                            </div>

                            <div className="flex items-center gap-x-12">
                                {/* Instagram social */}
                                <Link href="/">
                                    <svg
                                        className="h-auto w-7 text-blue-600"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.9997 2.33301C17.1695 2.33301 17.565 2.34467 18.8087 2.40301C20.0512 2.46134 20.897 2.65617 21.6413 2.94551C22.4113 3.24184 23.06 3.64317 23.7087 4.29067C24.3019 4.87389 24.761 5.57936 25.0538 6.35801C25.342 7.10117 25.538 7.94817 25.5963 9.19067C25.6512 10.4343 25.6663 10.8298 25.6663 13.9997C25.6663 17.1695 25.6547 17.565 25.5963 18.8087C25.538 20.0512 25.342 20.897 25.0538 21.6413C24.7618 22.4204 24.3027 23.1261 23.7087 23.7087C23.1253 24.3017 22.4199 24.7607 21.6413 25.0538C20.8982 25.342 20.0512 25.538 18.8087 25.5963C17.565 25.6512 17.1695 25.6663 13.9997 25.6663C10.8298 25.6663 10.4343 25.6547 9.19067 25.5963C7.94817 25.538 7.10234 25.342 6.35801 25.0538C5.57906 24.7616 4.87346 24.3024 4.29067 23.7087C3.69732 23.1256 3.23826 22.4201 2.94551 21.6413C2.65617 20.8982 2.46134 20.0512 2.40301 18.8087C2.34817 17.565 2.33301 17.1695 2.33301 13.9997C2.33301 10.8298 2.34467 10.4343 2.40301 9.19067C2.46134 7.94701 2.65617 7.10234 2.94551 6.35801C3.23745 5.57888 3.69661 4.87322 4.29067 4.29067C4.87362 3.69711 5.57917 3.23803 6.35801 2.94551C7.10234 2.65617 7.94701 2.46134 9.19067 2.40301C10.4343 2.34817 10.8298 2.33301 13.9997 2.33301ZM13.9997 8.16634C12.4526 8.16634 10.9688 8.78092 9.87489 9.87489C8.78092 10.9688 8.16634 12.4526 8.16634 13.9997C8.16634 15.5468 8.78092 17.0305 9.87489 18.1245C10.9688 19.2184 12.4526 19.833 13.9997 19.833C15.5468 19.833 17.0305 19.2184 18.1245 18.1245C19.2184 17.0305 19.833 15.5468 19.833 13.9997C19.833 12.4526 19.2184 10.9688 18.1245 9.87489C17.0305 8.78092 15.5468 8.16634 13.9997 8.16634ZM21.583 7.87467C21.583 7.4879 21.4294 7.11697 21.1559 6.84348C20.8824 6.56999 20.5114 6.41634 20.1247 6.41634C19.7379 6.41634 19.367 6.56999 19.0935 6.84348C18.82 7.11697 18.6663 7.4879 18.6663 7.87467C18.6663 8.26145 18.82 8.63238 19.0935 8.90587C19.367 9.17936 19.7379 9.33301 20.1247 9.33301C20.5114 9.33301 20.8824 9.17936 21.1559 8.90587C21.4294 8.63238 21.583 8.26145 21.583 7.87467ZM13.9997 10.4997C14.9279 10.4997 15.8182 10.8684 16.4745 11.5248C17.1309 12.1812 17.4997 13.0714 17.4997 13.9997C17.4997 14.9279 17.1309 15.8182 16.4745 16.4745C15.8182 17.1309 14.9279 17.4997 13.9997 17.4997C13.0714 17.4997 12.1812 17.1309 11.5248 16.4745C10.8684 15.8182 10.4997 14.9279 10.4997 13.9997C10.4997 13.0714 10.8684 12.1812 11.5248 11.5248C12.1812 10.8684 13.0714 10.4997 13.9997 10.4997Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Link>

                                {/* Twitter social */}
                                <Link href="/">
                                    <svg
                                        className="h-auto w-7 text-blue-600"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.539 23.501C18.596 23.501 23.5505 15.9965 23.5505 9.50004C23.5505 9.29004 23.5505 9.07704 23.5415 8.86704C24.5061 8.16877 25.3386 7.30427 26 6.31404C25.099 6.71132 24.1441 6.97315 23.1665 7.09104C24.1963 6.4755 24.9676 5.50699 25.337 4.36554C24.3695 4.93873 23.3105 5.3411 22.2065 5.55504C21.4643 4.76458 20.4821 4.24092 19.4121 4.06518C18.3421 3.88944 17.2441 4.07142 16.288 4.58295C15.3319 5.09447 14.5712 5.90698 14.1237 6.89463C13.6761 7.88228 13.5668 8.98994 13.8125 10.046C11.8546 9.94787 9.93922 9.43924 8.19056 8.55315C6.4419 7.66707 4.89903 6.42331 3.662 4.90254C3.03401 5.98716 2.84236 7.27014 3.12597 8.49094C3.40958 9.71174 4.14718 10.7788 5.189 11.4755C4.40831 11.449 3.64478 11.2394 2.96 10.8635V10.931C2.96135 12.0673 3.35496 13.1682 4.07431 14.0477C4.79366 14.9272 5.79462 15.5314 6.908 15.758C6.48539 15.8745 6.04884 15.9325 5.6105 15.9305C5.30148 15.9315 4.99307 15.9028 4.6895 15.845C5.00418 16.8231 5.61691 17.6783 6.44187 18.2908C7.26683 18.9032 8.2627 19.2423 9.29 19.2605C7.54483 20.6312 5.3891 21.3746 3.17 21.371C2.77898 21.3727 2.38823 21.3501 2 21.3035C4.25227 22.7394 6.86795 23.5019 9.539 23.501Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Link>

                                {/* Twitter social */}
                                <Link href="/">
                                    <svg
                                        className="h-auto w-7 text-blue-600"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M25.6663 13.9997C25.6663 7.55967 20.4397 2.33301 13.9997 2.33301C7.55967 2.33301 2.33301 7.55967 2.33301 13.9997C2.33301 19.6463 6.34634 24.348 11.6663 25.433V17.4997H9.33301V13.9997H11.6663V11.083C11.6663 8.83134 13.498 6.99967 15.7497 6.99967H18.6663V10.4997H16.333C15.6913 10.4997 15.1663 11.0247 15.1663 11.6663V13.9997H18.6663V17.4997H15.1663V25.608C21.058 25.0247 25.6663 20.0547 25.6663 13.9997Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Link>
                            </div>

                            <div>
                                <Link
                                    href="/"
                                    className="rounded-primary bg-blue-600 px-7 py-3 text-base font-medium capitalize text-white duration-300 hover:bg-blue-600/80 xl:px-12 xl:py-4 xl:text-2xl"
                                >
                                    Contact us
                                </Link>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-x-24 xl:gap-x-[75px]">
                            <nav>
                                <ul className="font-feature-settings space-y-6 text-base font-medium capitalize leading-5 xl:space-y-12">
                                    {[
                                        ["1", "Work With Us", "/"],
                                        ["2", "Advertise With Us", "/"],
                                        ["3", "Support Us", "/"],
                                        ["4", "Business Advices", "/"],
                                    ].map(([id, title, url]) => (
                                        <li key={id}>
                                            <Link
                                                className="hover:text-blue-600"
                                                href={url}
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <nav>
                                <ul className="font-feature-settings space-y-6 text-base font-medium capitalize leading-5 xl:space-y-12">
                                    {[
                                        ["1", "Private Coaching", "/"],
                                        ["2", "Our Work", "/"],
                                        ["3", "Our Commitment", "/"],
                                        ["4", "Our Team", "/"],
                                    ].map(([id, title, url]) => (
                                        <li key={id}>
                                            <Link
                                                className="hover:text-blue-600"
                                                href={url}
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <nav>
                                <ul className="font-feature-settings space-y-6 text-base font-medium capitalize leading-5 xl:space-y-12">
                                    {[
                                        ["1", "About Us", "/"],
                                        ["2", "FAQs", "/"],
                                        ["3", "Report a Bug", "/"],
                                    ].map(([id, title, url]) => (
                                        <li key={id}>
                                            <Link
                                                className="hover:text-blue-600"
                                                href={url}
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="bg-blue-600 text-white">
                    <div className="container mx-auto bg-blue-600 py-7 xl:py-14">
                        <div className="font-feature-settings flex items-center justify-between text-xs leading-5 xl:text-sm">
                            <p>© 2023 DIGITRUST - All Rights Reserved</p>
                            <div className="flex items-center gap-x-8 xl:gap-x-[125px]">
                                <Link href="/">Terms of use</Link>
                                <Link href="/">Privacy policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
