import NextLink from "next/link";
import Button from "@material-ui/core/Button/Button";

interface TwitterOAuthIconProps {}

export const TwitterOAuthIcon: React.FC<TwitterOAuthIconProps> = ({}) => {
  return (
    <NextLink
      href={`${process.env.NEXT_PUBLIC_API_URL?.replace(
        "/graphql",
        ""
      )}/auth/twitter`}
    >
      <Button>
        <img
          alt="Connexion Twitter"
          title="Connexion à FeelAgain avec Twitter"
          src={
            "https://res.cloudinary.com/dunc6xvuh/image/upload/v1614946082/material/twitter_jrdxsw.png"
          }
        />
      </Button>
    </NextLink>
  );
};
