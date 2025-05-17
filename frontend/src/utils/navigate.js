import { useNavigate } from "react-router";

const useCustomNavigate = () => {
    const navigate = useNavigate()
    return navigate
}

export default useCustomNavigate