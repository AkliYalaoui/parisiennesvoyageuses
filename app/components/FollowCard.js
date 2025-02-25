import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Pacifico } from "next/font/google";


const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

const FollowCard = ({ btntag, app, url, bg }) => {
  return (
    <div
      className={`${bg}  p-4 shadow rounded-md flex flex-col items-center justify-center gap-2`}
    >
      <Image
        alt="IG profile image"
        src="/ig/profile.jpg"
        width={80}
        height={80}
        className="rounded-full p-0.5 border-2 border-rose-400"
      />
      <span className={`text-coffee font-bold text-xl ${pacifico.className}`}>{app}</span>
      <Link
        href={url}
        target="_blank"
        className="rounded-md p-1 bg-softpink text-peach text-center hover:bg-pink-600"
      >
        {btntag}
      </Link>
    </div>
  );
};

export default FollowCard;
