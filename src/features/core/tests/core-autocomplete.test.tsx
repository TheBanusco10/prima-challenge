import { fireEvent, render } from "@testing-library/react";
import CoreAutocomplete from "../components/CoreAutocomplete";

it("should list all CoreAutocomplete items", () => {
  const items = [
    {
      label: "Lorem",
      value: "lorem",
    },
    {
      label: "Orange",
      value: "orange",
    },
  ];

  const { container } = render(
    <CoreAutocomplete id="test" label="Autocomplete" items={items} />,
  );

  const list = container.querySelector("ul");

  expect(list?.childElementCount).toBe(items.length);
});

it("should filter CoreAutocomplete items", () => {
  const items = [
    {
      label: "Lorem",
      value: "lorem",
    },
    {
      label: "Orange",
      value: "orange",
    },
  ];

  const { getByLabelText, container } = render(
    <CoreAutocomplete id="test" label="Autocomplete" items={items} />,
  );

  const input = getByLabelText("Autocomplete");

  fireEvent.change(input, { target: { value: "orange" } });

  const list = container.querySelector("ul");

  expect(list?.childElementCount).toBe(1);
});
