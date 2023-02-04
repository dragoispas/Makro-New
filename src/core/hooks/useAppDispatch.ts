import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

export function useAppDispatch(): AppDispatch {
  const dispatch = useDispatch();
  return dispatch as AppDispatch;
}
