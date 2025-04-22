import React from 'react'

type ButtonProps = {
    text: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    text,
    type = 'button',
    onClick,
    className = '',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
        >
            {text}
        </button>
    )
}

export default Button
