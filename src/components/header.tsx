
import Nav from "./nav";


interface HeaderProps {
    children?: React.ReactNode;
}
const Header = ({ children }: HeaderProps) => {


    return <header className="sticky top-0 z-30 w-full">
        <Nav />
    </header>

}
export { Header };