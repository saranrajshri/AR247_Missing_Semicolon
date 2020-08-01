import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// stylesheet
import "./Sidebar.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faThLarge,
  faPlusSquare,
  faMoneyBill,
  faLocationArrow,
  faUser,
  faChevronDown,
  faCogs
} from "@fortawesome/free-solid-svg-icons";

// Context
import { Context } from "../../../Context/Context";

const Sidebar = (props) => {
  const { setSelectedComponent, supplierData } = useContext(Context);
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [options] = useState([
    {
      name: "Overview",
      key: "Overview",
      iconName: faThLarge
    },
    {
      name: " Products",
      subCategories: [
        {
          name: "Add Products",
          key: "AddProduct"
        },
        {
          name: "Manage Products",
          key: "ManageProducts"
        }
      ],
      iconName: faPlusSquare
    },

    {
      name: "Manage Orders",
      iconName: faLocationArrow,
      subCategories: [
        {
          name: "Incoming Orders",
          key: "IncomingOrders"
        },
        {
          name: "Track Orders",
          key: "ManageOrders"
        }
      ]
    },

    {
      name: "Drivers",
      subCategories: [
        {
          name: "Manage Drivers",
          key: "ManageDrivers"
        }
      ],
      iconName: faUser
    },
    {
      name: "Calculate Trip Cost",
      key: "CalculateTripCost",
      iconName: faMoneyBill
    },
    {
      name: "Settings",
      key: "Settings",
      iconName: faCogs
    }
  ]);
  const history = useHistory();

  const handleSelect = (index) => {
    if (index === selectedIndex) setSelectedIndex(-1);
    else if (options[index].subCategories === undefined)
      setSelectedComponent(options[index].key);
    else setSelectedIndex(index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content-wrapper">
        <div className="avatar"></div>
        <p className="username">{supplierData.agencyName}</p>
        <div className="sidebar-light">
          {/* Menu */}
          <div className="sidebar-menu">
            {options.map((option, index) => {
              return (
                <div>
                  <div
                    className="menu-title"
                    onClick={() => handleSelect(index)}
                    key={index}
                    // onClick={() => setSelectedComponent(option.key)}
                  >
                    <span className="menu-item">
                      <FontAwesomeIcon
                        icon={option.iconName}
                        className="icon"
                      />
                      {option.name}
                      <FontAwesomeIcon
                        icon={
                          index === selectedIndex
                            ? faChevronDown
                            : faChevronRight
                        }
                        className="chevron"
                      />
                    </span>
                  </div>
                  {/* Sub Categories */}
                  {index === selectedIndex
                    ? options[selectedIndex].subCategories.map(
                        (subCategory, index) => {
                          return (
                            <div
                              className="subcategory-title"
                              onClick={() =>
                                setSelectedComponent(subCategory.key)
                              }
                            >
                              {subCategory.name}
                            </div>
                          );
                        }
                      )
                    : null}
                </div>
              );
            })}
          </div>
          {/* Logout */}
          <div id="sign-out" className="signout">
            <button
              class="ui basic button signout-button"
              onClick={() => {
                localStorage.setItem("supplierAuthToken", null);
                history.push("/supplier/login");
              }}
            >
              <i aria-hidden="true" class="sign-out icon"></i>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
