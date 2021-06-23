import NextLink from "next/link";
import Button from "@material-ui/core/Button/Button";

interface GoogleOAuthIconIconProps {}

export const GoogleOAuthIcon: React.FC<GoogleOAuthIconIconProps> = ({}) => {
  return (
    <NextLink
      href={`${process.env.NEXT_PUBLIC_API_URL?.replace(
        "/graphql",
        ""
      )}/auth/google`}
    >
      <Button>
        <img
          alt="Connexion Google"
          title="Connexion à FeelAgain avec Google"
          src={
            "https://res.cloudinary.com/dunc6xvuh/image/upload/v1614944830/material/google-symbol_acleoo.png"
          }
        />
      </Button>
    </NextLink>
  );
};
