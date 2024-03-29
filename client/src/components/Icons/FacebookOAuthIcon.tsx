import Button from "@material-ui/core/Button/Button";
import NextLink from "next/link";

interface FacebookOAuthIconProps {}

export const FacebookOAuthIcon: React.FC<FacebookOAuthIconProps> = ({}) => {
  return (
    <NextLink
      href={`${process.env.NEXT_PUBLIC_API_URL?.replace(
        "/graphql",
        ""
      )}/auth/facebook`}
    >
      <Button>
        <img
          alt="Connexion Facebook"
          title="Connexion à FeelAgain avec Facebook"
          src={
            "https://res.cloudinary.com/dunc6xvuh/image/upload/v1614946075/material/facebook_1_j2etka.png"
          }
        />
      </Button>
    </NextLink>
  );
};
