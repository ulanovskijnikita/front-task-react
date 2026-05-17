import { useState } from "react"

type DigitInputProps = {

    inputLabel: string
    inputValue: number
    updateInputValue(inputValue: number): void
    inputSpan: string
}

export default function DigitInput({inputLabel, inputValue, inputSpan, updateInputValue}: DigitInputProps) {

    // Не считаю нужным выносить состояние input'а в zustand store
    const [isActive, setIsActive] = useState(false)

    const [triadsCount, setTriadsCount] = useState( Math.floor(inputValue.toLocaleString("Ru-ru").length / 3) )

    return (

        <div
            className="flex items-center gap-3"
            onFocus={() => {

                setIsActive( true )
            }}
            onBlur={() => {

                setIsActive( false )
            }}
        >

            <img
                src="/img.png"
                alt={inputLabel}
                className={`w-14 h-14 rounded-full border-2 object-cover ${isActive && "border-violet-500" }`}
            />

            <div>

                <label htmlFor="hours-input" className={`block text-sm font-bold tracking-wide ${isActive ? "text-violet-500" : "text-gray-700"}`}>

                    {inputLabel.toUpperCase()}
                </label>

                <div className="flex items-center gap-2">

                    <input
                        style={{
                            width: 72 + 22 * triadsCount
                        }}
                        id="hours-input"
                        type="text"
                        defaultValue={inputValue.toLocaleString("Ru-ru")}
                        onInput={e => {

                            e.currentTarget.value = Number( e.currentTarget.value.replace(/[^0-9]/g, '') ).toLocaleString('ru-RU')

                            setTriadsCount( Math.floor( e.currentTarget.value.length / 3 ))
                        }}
                        onChange={(e) => {

                            updateInputValue(Number(e.target.value.replace(/\s+/g, '')) || 0)
                        }}
                        className={`rounded px-2 py-1 text-lg outline-none ${isActive ? "border-[1.5px] border-violet-500" : "border border-gray-300 text-gray-300"}`}
                        placeholder="0"
                    />
                    
                    <span className="text-gray-600">{inputSpan}</span>
                </div>
            </div>
        </div>
    )
}