import React, { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { connectToDatabase } from '../../utils/mongodb';
import Layout from '../../components/Layout';

type Property = {
  _id: string;
  propCost: string;
  selectedNeighborhood: string;
  selectedCity: string;
  status: string;
  propBedrooms: number;
  propBathrooms: number;
  propParking: number;
  imageList: { data: string }[];
};

type PropertyProps = {
  property: Property;
};

const PropertyPage = ({ property }: PropertyProps) => {
  // aquí puedes renderizar la vista de la propiedad
  return (
    <Layout>
      <div>
        <h1>{property.selectedNeighborhood}</h1>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params ? context.params.id : null;
  
    if (!id) {
      return {
        notFound: true, // Esto devolverá una página 404 si no hay un 'id' proporcionado.
      };
    }
  
    const { db } = await connectToDatabase();
    const data = await db.collection('properties').findOne({ _id: id });
    const property = JSON.parse(JSON.stringify(data));
  
    if (!property) {
      return {
        notFound: true, // Esto devolverá una página 404 si no se encuentra una propiedad con el 'id' proporcionado.
      };
    }
  
    return {
      props: { property },
    };
  };
  

export default PropertyPage;
