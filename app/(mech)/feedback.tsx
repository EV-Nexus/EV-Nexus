import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Text, useThemeColor, View } from '@/components/Themed';
import { Button } from '@/components/ui/Button';
import { MOCK_REPAIRS } from '@/constants/mockData';
import { Star, Wrench, Clock, ThumbsUp, ThumbsDown } from 'lucide-react-native';

export default function RepairFeedbackScreen() {
    const { id, service } = useLocalSearchParams();
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [issues, setIssues] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cardBgColor = useThemeColor({
        light: '#fff',
        dark: '#333',
    }, 'background');

    const mechanic = MOCK_REPAIRS.find(m => m.id === id);

    if (!mechanic) {
        return (
            <View style={styles.container}>
                <Text>Service not found</Text>
            </View>
        );
    }

    const commonIssues = [
        'Service took longer',
        'Higher than quoted',
        'Poor communication',
        'Quality concerns',
        'Cleanliness issues',
        'Parts availability',
    ];

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            router.push('/(tabs)/repairs');
        }, 1000);
    };

    const toggleIssue = (issue: string) => {
        if (issues.includes(issue)) {
            setIssues(issues.filter(i => i !== issue));
        } else {
            setIssues([...issues, issue]);
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <View style={styles.serviceHeader}>
                        <Wrench size={24} color='#059669' />
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceTitle}>{service}</Text>
                            <Text style={styles.mechanicName}>{mechanic.name}</Text>
                        </View>
                    </View>

                    <View style={styles.serviceDetail}>
                        <Clock size={16} color='#52525B' />
                        <Text style={styles.serviceTime}>Completed on March 15, 2024</Text>
                    </View>
                </View>

                <Text style={styles.title}>Rate Your Experience</Text>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.ratingTitle}>How was the service?</Text>

                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setRating(star)}
                                style={styles.starButton}
                            >
                                <Star
                                    size={32}
                                    color={star <= rating ? '#EAB308' : '#D4D4D8'}
                                    fill={star <= rating ? '#EAB308' : 'transparent'}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.ratingText}>
                        {rating === 0 ? 'Tap to rate' :
                            rating === 1 ? 'Poor' :
                                rating === 2 ? 'Fair' :
                                    rating === 3 ? 'Good' :
                                        rating === 4 ? 'Very Good' : 'Excellent'}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Feedback</Text>
                    <View style={styles.quickFeedback}>
                        <TouchableOpacity
                            style={[
                                styles.feedbackButton,
                                feedback === 'positive' && styles.feedbackButtonActive
                            ]}
                            onPress={() => setFeedback('positive')}
                        >
                            <ThumbsUp
                                size={24}
                                color={feedback === 'positive' ? '#FFFFFF' : '#16A34A'}
                            />
                            <Text
                                style={[
                                    styles.feedbackButtonText,
                                    feedback === 'positive' && styles.feedbackButtonTextActive
                                ]}
                            >
                                Satisfied with service
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.feedbackButton,
                                feedback === 'negative' && styles.feedbackButtonActive,
                                styles.negativeButton
                            ]}
                            onPress={() => setFeedback('negative')}
                        >
                            <ThumbsDown
                                size={24}
                                color={feedback === 'negative' ? '#FFFFFF' : '#DC2626'}
                            />
                            <Text
                                style={[
                                    styles.feedbackButtonText,
                                    feedback === 'negative' && styles.feedbackButtonTextActive
                                ]}
                            >
                                Had some issues
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {feedback === 'negative' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>What issues did you face?</Text>
                        <View style={styles.issuesGrid}>
                            {commonIssues.map((issue) => (
                                <TouchableOpacity
                                    key={issue}
                                    style={[
                                        styles.issueButton,
                                        issues.includes(issue) && styles.issueButtonActive
                                    ]}
                                    onPress={() => toggleIssue(issue)}
                                >
                                    <Text
                                        style={[
                                            styles.issueButtonText,
                                            issues.includes(issue) && styles.issueButtonTextActive
                                        ]}
                                    >
                                        {issue}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Additional Comments</Text>
                    <TextInput
                        style={styles.commentInput}
                        placeholder="Share your experience with the service..."
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                <Button
                    size="large"
                    style={styles.submitButton}
                    disabled={rating === 0 || !feedback}
                    loading={isSubmitting}
                    onPress={handleSubmit}
                >
                    Submit Feedback
                </Button>

                <Button
                    size="large"
                    variant="outline"
                    onPress={() => router.replace('/(tabs)/repairs')}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    card: {
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    serviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    serviceInfo: {
        marginLeft: 12,
        flex: 1,
        backgroundColor: 'transparent',
    },
    serviceTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    mechanicName: {
        fontSize: 14,
        color: '#52525B',
    },
    serviceDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        padding: 8,
        borderRadius: 6,
    },
    serviceTime: {
        fontWeight: '500',
        fontSize: 14,
        color: '#3F3F46',
        marginLeft: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 16,
    },
    ratingCard: {
        alignItems: 'center',
        marginBottom: 24,
    },
    ratingTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        backgroundColor: 'transparent',
    },
    starButton: {
        padding: 8,
    },
    ratingText: {
        fontWeight: '500',
        fontSize: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    quickFeedback: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    feedbackButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    feedbackButtonActive: {
        backgroundColor: '#16A34A',
    },
    negativeButton: {
        borderColor: '#FECACA',
    },
    feedbackButtonText: {
        fontWeight: '500',
        fontSize: 14,
        marginLeft: 8,
        color: '#3F3F46',
    },
    feedbackButtonTextActive: {
        color: '#FFFFFF',
    },
    issuesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -4,
    },
    issueButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        margin: 4,
        borderWidth: 1,
        borderColor: '#E4E4E7',
    },
    issueButtonActive: {
        backgroundColor: '#059669',
        borderColor: '#059669',
    },
    issueButtonText: {
        fontWeight: '500',
        fontSize: 14,
        color: '#3F3F46',
    },
    issueButtonTextActive: {
        color: '#FFFFFF',
    },
    commentInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        height: 120,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E4E4E7',
    },
    submitButton: {
        marginBottom: 12,
    },
});