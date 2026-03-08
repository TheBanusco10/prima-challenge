import { useEffect, useRef, useState } from "react";
import CoreInput from "./CoreInput";
import { CheckBold } from "../icons/CheckBold";

interface Item {
  label: string;
  value: string;
}

interface Props {
  label: string;
  items: Item[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

function CoreAutocomplete({
  label,
  items,
  placeholder,
  value,
  disabled,
  onChange,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [query, setQuery] = useState<Item[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setQuery(items);
  }, [items]);

  useEffect(() => {
    if (value) {
      setInputValue(findItemByValue(value)?.label || "");
    }
  }, [value]);

  const handleChangeInputValue = (value: string) => {
    setInputValue(value);
    setQuery(filterItemByLabel(value));
  };

  const handleItemClicked = (item: Item) => {
    setInputValue(item.label);
    setShowList(false);
    onChange?.(item.value);
  };

  const findItemByValue = (value: string) =>
    items.find((item) => item.value === value);

  const filterItemByLabel = (label: string) =>
    items.filter((item) =>
      item.label.toLowerCase().includes(label.toLowerCase()),
    );

  return (
    <div ref={containerRef}>
      <CoreInput
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        value={inputValue}
        onChange={handleChangeInputValue}
        onClick={() => setShowList(true)}
      />
      <ul
        className={`menu menu-md w-full max-h-52 overflow-y-auto mt-4 bg-base-100 rounded-lg shadow ${showList ? "block" : "hidden"}`}
      >
        {query.map((item) => (
          <li key={item.value} onClick={() => handleItemClicked(item)}>
            <a className="flex items-center gap-1">
              {value === item.value && (
                <CheckBold width=".7rem" height=".7rem" />
              )}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoreAutocomplete;
