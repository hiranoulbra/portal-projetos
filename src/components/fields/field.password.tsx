import PasswordVisibleIcon from "@/utils/icons/password.visible.icon";
import { useState } from "react";

interface FieldTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    showChangePassword?: boolean;
    groupProps?: React.HTMLAttributes<HTMLDivElement>;
    labelProps?: React.HTMLAttributes<HTMLLabelElement>;
    classNameLabel?: string;
    onReset?: () => void;
}
export const FieldPassword = ({ label, name, showChangePassword, value, onReset, labelProps, groupProps, onChange, ...props }: FieldTextProps) => {
    const [showPassword, setShowPassword] = useState(true);
    const [changePassword, setChangePassword] = useState(showChangePassword ? false : true);
    return <div className={`mb-4 ${groupProps?.className ?? ''}`} {...props}>
        <label className={`block mb-2 text-gray-800 ${labelProps?.className ?? ''}`} htmlFor={name}>{label}</label>
        {showChangePassword &&
            <>
                <label>Mudar senha?</label>

                <input type="checkbox" checked={changePassword} onChange={(ev) => {
              
                    setChangePassword(ev.target.checked)
                    if (onReset) {
                       
                        onReset();
                    }
                }} />
            </>}
        <div className="relative">
            <input {...props} disabled={!changePassword} type={showPassword ? 'password' : 'text'} className={`border rounded-md border-cyan-600 p-2 w-full${props.className ?? ''}`} name={name} value={value} onChange={onChange} />
            <a className="absolute right-2 top-2" onClick={() => setShowPassword(!showPassword)}>
                <PasswordVisibleIcon className="w-4 h-4 text-cyan-600" isVisible={showPassword} />
            </a>
        </div>
    </div >
}

