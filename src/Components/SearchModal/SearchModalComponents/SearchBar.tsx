import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Input, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { RootState } from '../../../app/store';
import { openSearchModal, setContent, setInput } from '../../../modules/search/searchModalSlice';

const CustomInput = styled(Input)`
  width: 550px;
  height: 60px;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-size: 20px;
  padding-left: 50px;
`;

const ClearButton = styled(ClearIcon)<{ visible: boolean }>`
  border: none;
  outline: none;
  font-weight: bold;
  padding: 4px 3px;
  flex-shrink: 0;
  text-decoration: underline;
  transition: 0.25s;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:hover {
    background: rgba(150, 150, 150, 0.15);
  }

  ${(props) => (props.visible ? 'opacity:100%; cursor:pointer; z-index: 2000;' : 'opacity:0%; pointer-events:none;')}
`;

const BackButton = styled(ChevronLeftIcon)`
  border: none;
  outline: none;
  font-weight: bold;
  padding: 4px 3px;
  flex-shrink: 0;
  text-decoration: underline;
  transition: 0.25s;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    background: rgba(150, 150, 150, 0.15);
  }
`;

export function SearchBar() {
  const content = useSelector((state: RootState) => state.searchModal.content);
  const input = useSelector((state: RootState) => state.searchModal.input);
  const active = useSelector((state: RootState) => state.searchModal.active);
  const dispatch = useDispatch();

  return (
    <Box
      style={{
        width: '630px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}
    >
      {content === 'searchResults' ? (
        <SearchIcon sx={{ transform: 'translate(-248px, 0px)', position: 'absolute' }} />
      ) : (
        <BackButton onClick={() => dispatch(setContent('searchResults'))} sx={{ transform: 'translate(-248px, 1px)', position: 'absolute', zIndex: '2000' }} />
      )}
      <CustomInput
        value={input}
        onMouseDown={() => dispatch(openSearchModal())}
        onChange={(e) => dispatch(setInput(e.target.value))}
        placeholder={content === 'searchResults' ? 'Search food' : 'Food name'}
        disabled={content === 'addEditForm'}
      />
      <ClearButton
        sx={{ transform: 'translate(248px, 0px)', position: 'absolute' }}
        color="inherit"
        visible={content !== 'addEditForm' && input !== '' && input !== undefined && active}
        onClick={() => {
          dispatch(setInput(''));
        }}
      />
    </Box>
  );
}
