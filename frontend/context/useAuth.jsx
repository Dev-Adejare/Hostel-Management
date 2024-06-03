import { useEffect, useContext } from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "./userContext";

const useAuthRedirect = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
}

export default useAuthRedirect;