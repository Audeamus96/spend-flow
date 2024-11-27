import { Container, Navbar, NavbarBrand, Button } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar expand="md" sticky="top" bg="light">
            <Container>
                <NavbarBrand>
                    Spend Flow
                </NavbarBrand>
                <Button variant="outline-danger">
                    Logout
                </Button>
            </Container>
        </Navbar>
      );
}
 
export default Header;