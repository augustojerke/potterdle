import { useRouter } from "next/navigation";
export default function Home() {
  useRouter().push("/login");
}
