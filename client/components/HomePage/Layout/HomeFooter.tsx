import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";

import digitrustLogo from "@/assets/images/digitrust.png";

const navLinksLeft = [
  {
    id: 1,
    title: "Work With Us",
    link: "/",
  },

  {
    id: 2,
    title: "Advertise With Us",
    link: "/",
  },

  {
    id: 3,
    title: "Support Us",
    link: "/",
  },

  {
    id: 4,
    title: "Business Advices",
    link: "/",
  },
];

const navLinksCenter = [
  {
    id: 1,
    title: "Private Coaching",
    link: "/",
  },

  {
    id: 2,
    title: "Our Work",
    link: "/",
  },

  {
    id: 3,
    title: "Our Commitment",
    link: "/",
  },

  {
    id: 4,
    title: "Our Team",
    link: "/",
  },
];

const navLinksRight = [
  {
    id: 1,
    title: "About Us",
    link: "/",
  },

  {
    id: 2,
    title: "FAQs",
    link: "/",
  },

  {
    id: 3,
    title: "Report a Bug",
    link: "/",
  },
];

export default function Footer() {
  return (
    <footer className="text-sm xl:text-base">
      <div className="justify-between space-y-12 px-[60px] py-14 lg:flex lg:space-y-0 xl:px-[120px]">
        <div className="space-y-10 lg:space-y-[60px]">
          {/* Logo */}
          <Link href="/">
            <Image src={digitrustLogo} alt="digitrust logo" height={50} />
          </Link>

          {/* Socical Link */}
          <div className="flex items-center gap-x-[47px]">
            {/* Instagram */}
            <Link href="/">
              <svg
                className="text-socialLink h-auto w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M13.9997 2.33325C17.1695 2.33325 17.565 2.34492 18.8087 2.40325C20.0512 2.46159 20.897 2.65642 21.6413 2.94575C22.4113 3.24209 23.06 3.64342 23.7087 4.29092C24.3019 4.87413 24.761 5.57961 25.0538 6.35825C25.342 7.10142 25.538 7.94842 25.5963 9.19092C25.6512 10.4346 25.6663 10.8301 25.6663 13.9999C25.6663 17.1698 25.6547 17.5653 25.5963 18.8089C25.538 20.0514 25.342 20.8973 25.0538 21.6416C24.7618 22.4207 24.3027 23.1263 23.7087 23.7089C23.1253 24.302 22.4199 24.761 21.6413 25.0541C20.8982 25.3423 20.0512 25.5383 18.8087 25.5966C17.565 25.6514 17.1695 25.6666 13.9997 25.6666C10.8298 25.6666 10.4343 25.6549 9.19067 25.5966C7.94817 25.5383 7.10234 25.3423 6.35801 25.0541C5.57906 24.7618 4.87346 24.3027 4.29067 23.7089C3.69732 23.1258 3.23826 22.4203 2.94551 21.6416C2.65617 20.8984 2.46134 20.0514 2.40301 18.8089C2.34817 17.5653 2.33301 17.1698 2.33301 13.9999C2.33301 10.8301 2.34467 10.4346 2.40301 9.19092C2.46134 7.94725 2.65617 7.10259 2.94551 6.35825C3.23745 5.57913 3.69661 4.87346 4.29067 4.29092C4.87362 3.69736 5.57917 3.23827 6.35801 2.94575C7.10234 2.65642 7.94701 2.46159 9.19067 2.40325C10.4343 2.34842 10.8298 2.33325 13.9997 2.33325ZM13.9997 8.16659C12.4526 8.16659 10.9688 8.78117 9.87489 9.87513C8.78092 10.9691 8.16634 12.4528 8.16634 13.9999C8.16634 15.547 8.78092 17.0307 9.87489 18.1247C10.9688 19.2187 12.4526 19.8333 13.9997 19.8333C15.5468 19.8333 17.0305 19.2187 18.1245 18.1247C19.2184 17.0307 19.833 15.547 19.833 13.9999C19.833 12.4528 19.2184 10.9691 18.1245 9.87513C17.0305 8.78117 15.5468 8.16659 13.9997 8.16659ZM21.583 7.87492C21.583 7.48814 21.4294 7.11721 21.1559 6.84372C20.8824 6.57023 20.5114 6.41659 20.1247 6.41659C19.7379 6.41659 19.367 6.57023 19.0935 6.84372C18.82 7.11721 18.6663 7.48814 18.6663 7.87492C18.6663 8.26169 18.82 8.63263 19.0935 8.90612C19.367 9.17961 19.7379 9.33325 20.1247 9.33325C20.5114 9.33325 20.8824 9.17961 21.1559 8.90612C21.4294 8.63263 21.583 8.26169 21.583 7.87492ZM13.9997 10.4999C14.9279 10.4999 15.8182 10.8687 16.4745 11.525C17.1309 12.1814 17.4997 13.0717 17.4997 13.9999C17.4997 14.9282 17.1309 15.8184 16.4745 16.4748C15.8182 17.1312 14.9279 17.4999 13.9997 17.4999C13.0714 17.4999 12.1812 17.1312 11.5248 16.4748C10.8684 15.8184 10.4997 14.9282 10.4997 13.9999C10.4997 13.0717 10.8684 12.1814 11.5248 11.525C12.1812 10.8687 13.0714 10.4999 13.9997 10.4999Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            {/* Twiiter */}
            <Link href="/">
              <svg
                className="text-socialLink h-auto w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M9.539 23.5009C18.596 23.5009 23.5505 15.9964 23.5505 9.49992C23.5505 9.28992 23.5505 9.07692 23.5415 8.86692C24.5061 8.16865 25.3386 7.30415 26 6.31392C25.099 6.71119 24.1441 6.97303 23.1665 7.09092C24.1963 6.47537 24.9676 5.50687 25.337 4.36542C24.3695 4.9386 23.3105 5.34098 22.2065 5.55492C21.4643 4.76445 20.4821 4.24079 19.4121 4.06505C18.3421 3.88931 17.2441 4.0713 16.288 4.58282C15.3319 5.09435 14.5712 5.90686 14.1237 6.89451C13.6761 7.88216 13.5668 8.98982 13.8125 10.0459C11.8546 9.94774 9.93922 9.43912 8.19056 8.55303C6.4419 7.66694 4.89903 6.42318 3.662 4.90242C3.03401 5.98704 2.84236 7.27002 3.12597 8.49082C3.40958 9.71161 4.14718 10.7787 5.189 11.4754C4.40831 11.4489 3.64478 11.2393 2.96 10.8634V10.9309C2.96135 12.0671 3.35496 13.168 4.07431 14.0476C4.79366 14.9271 5.79462 15.5312 6.908 15.7579C6.48539 15.8743 6.04884 15.9324 5.6105 15.9304C5.30148 15.9314 4.99307 15.9027 4.6895 15.8449C5.00418 16.823 5.61691 17.6782 6.44187 18.2906C7.26683 18.9031 8.2627 19.2422 9.29 19.2604C7.54483 20.6311 5.3891 21.3745 3.17 21.3709C2.77898 21.3726 2.38823 21.35 2 21.3034C4.25227 22.7393 6.86795 23.5017 9.539 23.5009Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            {/* Facebook */}
            <Link href="/">
              <svg
                className="text-socialLink h-auto w-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M25.6663 13.9999C25.6663 7.55992 20.4397 2.33325 13.9997 2.33325C7.55967 2.33325 2.33301 7.55992 2.33301 13.9999C2.33301 19.6466 6.34634 24.3483 11.6663 25.4333V17.4999H9.33301V13.9999H11.6663V11.0833C11.6663 8.83159 13.498 6.99992 15.7497 6.99992H18.6663V10.4999H16.333C15.6913 10.4999 15.1663 11.0249 15.1663 11.6666V13.9999H18.6663V17.4999H15.1663V25.6083C21.058 25.0249 25.6663 20.0549 25.6663 13.9999Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>

          {/* Button */}
          <Button>Contact Us</Button>
        </div>

        <div className="hidden sm:display-block space-y-10 lg:flex lg:justify-end lg:gap-x-[75px] lg:space-y-0">
          <nav>
            <ul className="space-y-3 text-sm leading-[20px] lg:space-y-[48px] xl:text-base">
              {navLinksLeft.map((item) => (
                <li>
                  <Link
                    className="capitalize duration-300 hover:text-blue-600"
                    href={item.link}
                    key={item.id}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="space-y-3 text-sm leading-[20px] lg:space-y-[48px] xl:text-base">
              {navLinksCenter.map((item) => (
                <li>
                  <Link
                    className="capitalize duration-300 hover:text-blue-600"
                    href={item.link}
                    key={item.id}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <ul className="space-y-3 text-sm leading-[20px] lg:space-y-[48px] xl:text-base">
              {navLinksRight.map((item) => (
                <li>
                  <Link
                    className="capitalize duration-300 hover:text-blue-600"
                    href={item.link}
                    key={item.id}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap gap-y-5 items-center justify-between bg-blue-600 px-[60px] py-10 text-white xl:px-[100px]">
        <p>© 2023 DIGITRUST - All Rights Reserved</p>
        <div className="flex items-center gap-x-24">
          <Link href="/">Terms of use</Link>
          <Link href="/">Privacy policy</Link>
        </div>
      </div>
    </footer>
  );
}
