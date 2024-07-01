import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { isAdminUser } from "../utility/api";
import { toast } from "sonner";


export default function Private(props) {
    const { Component } = props;
    const navigate = useNavigate();

    const isAdmin = useCallback(async () => {
        const { data } = await isAdminUser();
        if (!data.success) {
            toast.warning(data.message)
            navigate(`/admin`);
        }
    }, [navigate])

    useEffect(() => {
        isAdmin();
    }, [isAdmin])

    return (
        <div>
            <Component />
        </div>
    )
}

Private.propTypes = {
    Component: PropTypes.elementType.isRequired,
};