import { screen } from "@testing-library/react";
import { expect, it, describe } from "vitest";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";
import { render } from "../../../app/test-utils/render";

import { Logo } from "./Logo";

describe("Logo component", function () {
  it("should render component Logo", () => {
    render(
      <Provider store={setupStore}>
        <Logo />
      </Provider>
    );
    expect(screen.getByText(/.FrontEnd/i));
    expect(screen.findByAltText("logo-icon"));
    expect(screen.findAllByRole("image"));
  });
});
