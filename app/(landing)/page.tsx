import Link from "next/link";
import { Button } from "../(components)/ui/shadcn/button";

const LandingPage = () => {
  return (
    <div>
      Landing Page
        <div>
          <Link href="/sign-up">
            <Button>
              Register
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button>
              Login
            </Button>
          </Link>
        </div>
    </div>
  );
}

export default LandingPage;