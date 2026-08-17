import type React from "react";

interface PropTypes {
    children: React.ReactNode
}

const FormRow = (props: PropTypes) => {
    const { children } = props;
    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {children}
        </div>
    )
}

export default FormRow;