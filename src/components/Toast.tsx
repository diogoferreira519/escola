import { ToastProps } from "../types/ToastType";

const Toast = ({message, type}: ToastProps)=> {
    return(
        <>
        <div className="toast">
            <div className={`alert ${type}`}>
            <span>{message}</span>
            </div>
        </div>
    </>
    );
}
export default Toast;