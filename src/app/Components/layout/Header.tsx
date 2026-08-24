import ServerApi from "@/utils/Server";
import Navbar from "./Navbar";

export interface CourseMenuItem {
  PageName: string;
  PageUrl: string;
}

const Header = async () => {
  let courses: CourseMenuItem[] = [];

  try {
    const courseDropDownApi = new ServerApi({
      withAuth: false,
      spName: "SPClientAnonymous",
      mode: 55,
    });

    const courseDropDownData = await courseDropDownApi.request();

    if (
      courseDropDownData?.isSuccess &&
      courseDropDownData?.result
    ) {
      const parsedData =
        typeof courseDropDownData.result === "string"
          ? JSON.parse(courseDropDownData.result)
          : courseDropDownData.result;

      if (Array.isArray(parsedData)) {
        courses = parsedData;
      }
    }
  } catch (error) {
    console.error("Course dropdown API error:", error);
  }

  // TODO: remove this filter once other course pages are built — for now
  // only the AVFM page exists, so the dropdown should offer just that.

  return <Navbar courses={courses} />;
};

export default Header;
