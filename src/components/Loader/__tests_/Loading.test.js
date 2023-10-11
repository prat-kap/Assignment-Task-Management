import { render } from "@testing-library/react"

import Loading from "../../Loader/Loading"
import "../../../i18n"

test("Should render Loading", async () => {
  const { container } = render(<Loading />)
  expect(container).toMatchSnapshot()
})
