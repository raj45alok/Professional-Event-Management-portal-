
import { useParams } from 'react-router-dom';
import ClassicEvent from './ClassicEvent';
import ModernEvent from './ModernEvent';

export default function EventWrapper() {
  const { template } = useParams();
  return template === 'classic' ? <ClassicEvent /> : <ModernEvent />;
}
