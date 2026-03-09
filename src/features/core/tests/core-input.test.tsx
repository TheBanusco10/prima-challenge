import { render } from "@testing-library/react";
import CoreInput from "../components/CoreInput";

describe("CoreInput", () => {
  it("should render the CoreInput component", () => {
    const { getByPlaceholderText } = render(
      <CoreInput id="test" label="Test" placeholder="Test" />,
    );

    const input = getByPlaceholderText("Test");

    expect(input).toBeTruthy();
  });
});
