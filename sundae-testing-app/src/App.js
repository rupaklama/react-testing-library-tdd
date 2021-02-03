import Options from './pages/entry/Options';
import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <div>
      <h3>Got Sundae!</h3>
      <Options optionType='scoops' />
      <SummaryForm />
    </div>
  );
}

export default App;
