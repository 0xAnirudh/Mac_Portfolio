import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { navIcons } from "#constants";
import { navLinks } from "#constants/index.js";
import useWindowStore from "#store/window.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const Navbar = () => {

  const { openWindow } = useWindowStore();

  return ( 
    <nav>
      <div>
        <img src="images/logo.svg" alt="logo" />
        <p className="font-semibold">Anirudh's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key = {id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({id, img}) => (
            <li key = {id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().tz('Asia/Kolkata').format("ddd MMM D, h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar