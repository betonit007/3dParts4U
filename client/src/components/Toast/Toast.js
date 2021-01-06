import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteToast } from '../../actions/toastActions'
import './toast.css';

const Toast = ({ position = 'top-right', autoDelete = true, dismissTime = 4000 }) => {

    const dispatch = useDispatch()

    const { toastList } = useSelector(state => state.toastList)
    console.log(toastList)
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length) {
                dispatch(deleteToast(toastList[0].id));
            }
        }, dismissTime);

        return () => {
            clearInterval(interval);
        }

        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime]);


    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    toastList.map((toast, i) =>
                        <div
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => dispatch(deleteToast(toast.id))}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">
                                    {toast.description}
                                </p>
                                <p className="notification-message">
                                    {/* {toast.title} */}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}


export default Toast;