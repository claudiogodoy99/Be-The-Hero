import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import logoImg from '../assets/logo.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';



export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [incidentsCount, setIncidentsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function getIncidents() {
        if (loading)
            return;

        if (incidentsCount > 0 && incidents.length === incidentsCount)
            return;

        setLoading(true);

        const response = await api.get('incidents', {
            params: {
                page
            }
        });

        setIncidents([...incidents, ...response.data]);
        setIncidentsCount(response.headers["x-total-count"])
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        getIncidents();
    }, [])

    function navigationToDetail(incident) {
        navigation.navigate('Details', { incident });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    <Text>
                        Total de <Text style={styles.headertextBold}> {incidentsCount} casos </Text>.
                    </Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia
            </Text>

            <FlatList style={styles.incidentList} data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={getIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.nome}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton}
                            onPress={() => navigationToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={17} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    );
}