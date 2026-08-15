import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


type AlertVariant = "success" | "error" | "info" | "warning";

interface PropTypes {
    variant: AlertVariant;
    title: string;
    description?: string;
    className?: string;
}

const variantConfig = {
    success: { icon: CheckCircle2Icon, className: "border-green-500 text-green-700 [&>svg]:text-green-600" },
    error: { icon: XCircleIcon, className: "border-red-500 text-red-700 [&>svg]:text-red-600" },
    info: { icon: InfoIcon, className: "" },
    warning: { icon: AlertTriangleIcon, className: "border-yellow-500 text-yellow-700 [&>svg]:text-yellow-600" },
};

const StatusAlert = (props: PropTypes) => {
    const { title, variant, className, description } = props;
    const { icon: Icon, className: variantClassName } = variantConfig[variant];
    return (
        <Alert className={`${variantClassName} ${className ?? ""}`}>
            <Icon />
            <AlertTitle>{title}</AlertTitle>
            {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
    );
}

export default StatusAlert;