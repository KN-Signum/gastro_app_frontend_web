import { Outlet } from 'react-router-dom';
import WholeNavBar from '../../components/bars/Wholebar';
import './AppLayout.css';

export default function AppLayout() {
    return (
        <div className="app-layout">
            <WholeNavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
