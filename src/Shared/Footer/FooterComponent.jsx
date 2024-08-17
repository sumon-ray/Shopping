
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function FooterComponent() {
  return (
    <Footer container>
      <FooterCopyright href="#" by="Shopping" year={2024} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
