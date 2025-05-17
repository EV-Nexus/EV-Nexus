import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react-native';

import { Button } from '@/components/ui/Button';
import { Text, useThemeColor, View } from '@/components/Themed';

export default function FeedbackScreen() {
    const router = useRouter();

    const cardBgColor = useThemeColor({
        light: '#fff',
        dark: '#333',
    }, 'background');
    const containerBgColor = useThemeColor({
        light: '#F3F4F6',
        dark: '#000',
    }, 'background');
    

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [issues, setIssues] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const commonIssues = [
        'Long wait time',
        'Battery not fully charged',
        'Difficult to swap',
        'Staff assistance needed',
        'Station cleanliness',
        'Technical issues',
    ];

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            router.push('/(tabs)/battery-swap');
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
        <ScrollView 
        style={[styles.container, { backgroundColor: containerBgColor }]} 
        showsVerticalScrollIndicator={false}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='handled'
        >
            <View style={[styles.content, { backgroundColor: containerBgColor }]}>
                <Text style={styles.title}>Rate Your Experience</Text>
                <Text style={styles.subtitle}>
                    Help us improve our service with your feedback
                </Text>

                <View style={[styles.card, { backgroundColor: cardBgColor }]}>
                    <Text style={styles.ratingTitle}>How was your swap experience?</Text>

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
                                Everything worked well
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
                        placeholder="Share more details about your experience..."
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
                    variant="outline"
                    size="large"
                    onPress={() => router.replace('/(tabs)/battery-swap')}
                    leadingIcon={<Star size={24} color='#10B981' />}
                >
                    Skip for now
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
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#52525B',
        marginBottom: 24,
    },
    card: {
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
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
        backgroundColor: 'transparent',
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    quickFeedback: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
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
        borderColor: '#FEF08A',
    },
    feedbackButtonText: {
        fontWeight: '500',
        fontSize: 14,
        marginLeft: 8,
        color: '#18181B',
    },
    feedbackButtonTextActive: {
        color: '#FFFFFF',
    },
    issuesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -4,
        backgroundColor: 'transparent',
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
        color: '#18181B',
        borderWidth: 1,
        borderColor: '#E4E4E7',
    },
    submitButton: {
        marginBottom: 12,
    },
});