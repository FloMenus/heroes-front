import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div class="navbar bg-base-100 bg-gradient-to-r from-cyan-100 to-teal-100 drop-shadow-2xl">
      <div class="flex-1">
      <Link to="/" class="btn btn-ghost normal-case text-xl">
              Heroes
            </Link>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li>
            <Link to="/add" class="btn btn-primary normal-case text-xl">
              Add hero
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
