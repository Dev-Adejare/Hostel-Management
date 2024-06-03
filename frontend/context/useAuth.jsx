import { useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Usercontext } from "./userContext";

const useAuthRedirect = () => {
    const {user} = useContext(Usercontext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
}

export default useAuthRedirect;