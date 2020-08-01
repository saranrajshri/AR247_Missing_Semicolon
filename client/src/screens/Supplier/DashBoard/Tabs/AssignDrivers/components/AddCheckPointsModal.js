import React, { useState, useContext } from "react";

import { Modal, Search, Divider, Button } from "semantic-ui-react";
import {
  getPlacesSuggestions,
  geoCoder,
} from "../../../../../../actions/mapActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../../../../Context/Context";

/**
 * Modal to Add number of checkpoints along the route
 * @param {Props} props
 */

const AddCheckPointsModal = (props) => {
  const { isOpen, handleClose } = props;

  const [searchValue, setSearchValue] = useState("");
  const [isSuggestionBoxOpen, setSuggestionBoxOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const { setFullScreenLoader } = useContext(Context);

  const handleSearchChange = async (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.trim() !== "") {
      getPlacesSuggestions(e.target.value).then((res) => {
        if (res.status) {
          setSuggestionBoxOpen(true);
          var newSuggestions = [];
          res.data.map((place) => {
            var subData = {};
            subData.title = place;
            newSuggestions.push(subData);
            return null;
          });
          setSuggestions(newSuggestions);
        }
      });
    } else {
      setSuggestionBoxOpen(false);
      setSuggestions([]);
    }
  };

  const handleSelect = (e, { result }) => {
    setFullScreenLoader(true);
    // Get the lat and lon of the place
    geoCoder(result.title)
      .then((res) => {
        result.coordinates = res.data;
        setFullScreenLoader(false);
      })
      .catch(() => {
        setFullScreenLoader(false);
      });
    setSelectedPlaces((selectedPlaces) => [...selectedPlaces, result]);
    setSuggestionBoxOpen(false);
    setSearchValue("");
  };

  const handleDelete = (placeName) => {
    setSelectedPlaces(
      selectedPlaces.filter((place) => place.title !== placeName)
    );
  };

  return (
    <Modal
      dimmer="blurring"
      open={isOpen}
      onClose={(selectedPlaces) => handleClose(selectedPlaces)}
    >
      <Modal.Header>Add Checkpoints</Modal.Header>
      <Modal.Content>
        <Search
          onSearchChange={handleSearchChange}
          open={isSuggestionBoxOpen}
          results={suggestions.slice(0, 4)}
          id="full-width-searchbar-modal"
          onResultSelect={handleSelect}
          placeholder="Search Places Here"
          value={searchValue}
        />
        <Divider />
        {selectedPlaces.map((place, index) => {
          return (
            <div key={index} className="checkpoints-list">
              {place.title}
              <Button
                style={{ marginLeft: 20 }}
                color="red"
                size="mini"
                onClick={() => handleDelete(place.title)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          );
        })}
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" onClick={() => handleClose(selectedPlaces)}>
          Done
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default AddCheckPointsModal;
