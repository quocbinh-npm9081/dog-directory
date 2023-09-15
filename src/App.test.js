import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import mockFetch from "./mocks/mockFetch";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  console.log("clear with afterEach");
  jest.resetAllMocks();
});
//test("renders the landing page", async () => {
//   render(<App />);

//   //--getBy dùng để tìm phần tử static
//   //findBy dùng để tìm phần tử dynamic (async), findBy trả vè 1 Promise nó đợi khi nào được giải quyết rồi sau đó nó mới đi tìm thành phần, chứ nó không đi tìm ngay sau khi được gọi

//   expect(
//     screen.getByRole("heading", { name: "main-heading" })
//   ).toHaveTextContent(/Doggy Directory/);

//   expect(
//     await screen.findByRole("option", { value: { text: "husky" } })
//   ).toBeInTheDocument();

//   // expect(screen.getByLabelText("main-heading")).toHaveTextContent(
//   //   /Doggy Directory/
//   // );

//   expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
//   // expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
//   // expect(screen.getByRole("img")).toBeInTheDocument();
// });

test("should be able to search and display dog image results", async () => {
  render(<App />);

  //Simulate selecting an option and verifying its value
  const select = screen.getByRole("combobox");
  expect(
    await screen.findByRole("option", { value: { text: "akita" } })
  ).toBeInTheDocument();
  userEvent.selectOptions(select, "cattledog");
  expect(select).toHaveValue("cattledog");

  //Initiate the search request
  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).not.toBeDisabled();
  userEvent.click(searchBtn);

  //Loading state displays and gets removed once results are displayed
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

  //Verify image display and results count
  const dogImages = screen.getAllByRole("img");

  expect(dogImages).toHaveLength(2);
  expect(screen.getByText(/2 Results/i)).toBeInTheDocument();
  // expect(dogImages[0]).toHaveAccessibleName("cattledog 1 of 2");
  // expect(dogImages[1]).toHaveAccessibleName("cattledog 2 of 2");
});
