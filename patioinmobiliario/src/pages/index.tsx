import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

type Property = {
  _id: string;
  name: string;
  address: string;
  // Agrega otras propiedades aquí
};

type HomeProps = {
  properties: Property[];
};

const HomePage = ({ properties }: HomeProps) => {
  return (
    <Layout>
      <title>Patio Inmobiliario</title>
      <div className="container">
        <h1>Propiedades en Venta</h1>
        <ul>
          {properties.map((property) => (
            <li key={property._id}>
              <Link href={`/propiedades/${property._id}`}>
                <a>{property.name}</a>
              </Link>
              <p>{property.address}</p>
              {/* Agrega otras propiedades aquí */}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch('http://localhost:3000/api/properties');
  const { data } = await res.json();
  return { props: { properties: data } };
};
