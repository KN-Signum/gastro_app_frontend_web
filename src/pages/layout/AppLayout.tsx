import { Outlet } from 'react-router-dom';
import WholeNavBar from '../../components/bars/Wholebar';

export default function AppLayout() {
    return (
        <>
            <WholeNavBar />
            <main className="app-shell">
                <Outlet />
            </main>
        </>
    );
}
